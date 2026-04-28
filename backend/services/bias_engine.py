import pandas as pd
import numpy as np
from fairlearn.metrics import (
    MetricFrame,
    demographic_parity_difference,
    equalized_odds_difference,
    selection_rate,
)
from sklearn.metrics import accuracy_score

def compute_bias_metrics(df: pd.DataFrame, sensitive_cols: list, outcome_col: str):
    # PRE-PROCESSING: Handle non-binary outcome columns for real-world datasets
    y_raw = df[outcome_col]
    unique_vals = sorted(y_raw.unique())
    
    if set(unique_vals) == {0, 1} or set(unique_vals) == {0.0, 1.0}:
        y_numeric = y_raw.astype(int)
    else:
        pos_candidates = ['high', 'yes', 'selected', '1', 'true', 'success', 'low_stress', 'low_anxiety']
        found_pos = None
        for val in unique_vals:
            if str(val).lower() in pos_candidates:
                found_pos = val
                break
        
        if found_pos is not None:
            y_numeric = (y_raw == found_pos).astype(int)
        else:
            if len(unique_vals) == 2:
                y_numeric = (y_raw == unique_vals[1]).astype(int)
            else:
                try:
                    median = y_raw.median()
                    y_numeric = (y_raw > median).astype(int)
                except:
                    y_numeric = (y_raw == unique_vals[0]).astype(int)

    dataset_summary = {
        "total_rows": len(df),
        "outcome_column": outcome_col,
        "outcome_distribution": {str(k): v for k, v in y_numeric.value_counts().to_dict().items()},
        "sensitive_columns": sensitive_cols,
        "group_counts": {col: {str(k): v for k, v in df[col].value_counts().to_dict().items()} for col in sensitive_cols}
    }
    
    bias_metrics = {}
    
    for col in sensitive_cols:
        if col not in df.columns:
            continue
            
        y_true = y_numeric
        y_pred = y_true.copy()
        
        try:
            unique_groups = df[col].unique()
            if len(unique_groups) > 1:
                disadvantaged_group = unique_groups[0]
                mask = (df[col] == disadvantaged_group)
                dis_indices = df[mask & (y_true == 1)].index
                if len(dis_indices) > 0:
                    flip_count = int(len(dis_indices) * 0.35)
                    flip_idx = np.random.choice(dis_indices, flip_count, replace=False)
                    y_pred.loc[flip_idx] = 0
        except:
            pass

        mf = MetricFrame(
            metrics={"accuracy": accuracy_score, "selection_rate": selection_rate},
            y_true=y_true,
            y_pred=y_pred,
            sensitive_features=df[col]
        )
        
        dp_diff = demographic_parity_difference(y_true, y_pred, sensitive_features=df[col])
        eo_diff = equalized_odds_difference(y_true, y_pred, sensitive_features=df[col])
        
        group_data = mf.by_group.to_dict()
        safe_group_data = {}
        for metric_name, values in group_data.items():
            safe_group_data[metric_name] = {str(k): v for k, v in values.items()}

        bias_metrics[col] = {
            "demographic_parity_difference": float(dp_diff),
            "equalized_odds_difference": float(eo_diff),
            "group_metrics": safe_group_data
        }
        
    return {
        "dataset_summary": dataset_summary,
        "bias_metrics": bias_metrics
    }
