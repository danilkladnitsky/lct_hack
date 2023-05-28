package pg

import (
	"context"
	"fmt"
	"gorm.io/gorm"
	"moscow-hack/internal/models"
	"moscow-hack/internal/services"
)

type UserRepo struct {
	db *gorm.DB
}

var _ services.UserRp = (*UserRepo)(nil)

func NewUserRepo(db *gorm.DB) *UserRepo {
	return &UserRepo{db: db}
}

func (u *UserRepo) CreateUser(ctx context.Context, user *models.User) error {
	if err := u.db.WithContext(ctx).Table("users").Create(user).Error; err != nil {
		return fmt.Errorf("cannot create query: %w", err)
	}
	return nil
}

func (u *UserRepo) CheckExistence(ctx context.Context, login string) (*models.User, error) {
	var user *models.User
	if err := u.db.WithContext(ctx).Table("users").Where("login = ?", login).First(&user).Error; err != nil {
		return nil, fmt.Errorf("cannot create query: %w", err)
	}
	return user, nil
}
