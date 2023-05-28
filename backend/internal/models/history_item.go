package models

type HistoryItem struct {
	Address   string   `json:"address"`
	Unom      int64    `json:"unom"`
	Latitude  string   `json:"latitude"`
	Longitude string   `json:"longitude"`
	WorkType  []string `json:"work_type"`
}
