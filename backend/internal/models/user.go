package models

type User struct {
	Login    string `json:"login" gorm:"unique;not null"`
	Password string `json:"password" gorm:"not null"`
}
