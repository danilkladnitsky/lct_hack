package models

type IncidentWithUnom struct {
	IncidentName string  `json:"incident_name"`
	Unom         int64   `json:"unom"`
	Address      string  `json:"address"`
	Latitude     float64 `json:"latitude"`
	Longitude    float64 `json:"longitude"`
}
