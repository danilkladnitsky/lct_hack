package models

type MLData struct {
	Unom      []int64  `json:"unom"`
	Source    []string `json:"source"`
	WorkType  []string `json:"work_type"`
	StartDate string   `json:"start_date"`
	EndDate   string   `json:"end_date"`
}
