package models

import "time"

type History struct {
	Login     string    `json:"login"`
	CreatedAt time.Time `json:"created_at"`
	Request   string    `json:"request"`
	Response  string    `json:"response"`
}
