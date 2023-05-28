package models

type History struct {
	Login     string `json:"login"`
	CreatedAt string `json:"created_at"`
	Request   string `json:"request"`
	Response  string `json:"response"`
}
