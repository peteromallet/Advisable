CREATE TRIGGER logidze_on_agreements
BEFORE UPDATE OR INSERT ON agreements FOR EACH ROW
WHEN (coalesce(current_setting('logidze.disabled', true), '') <> 'on')
-- Parameters: history_size_limit (integer), timestamp_column (text), filtered_columns (text[]),
-- include_columns (boolean), debounce_time_ms (integer)
EXECUTE PROCEDURE logidze_logger(null, 'updated_at');