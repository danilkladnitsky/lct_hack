package services

import (
	"context"
	"golang.org/x/crypto/bcrypt"
	"moscow-hack/internal/models"
)

type UserService struct {
	rp UserRp
}

var _ UserUseCase = (*UserService)(nil)

func NewUserService(rp UserRp) *UserService {
	return &UserService{rp: rp}
}

func (u *UserService) hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 6)
	return string(bytes), err
}

func (u *UserService) checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func (u *UserService) CreateNewUser(ctx context.Context, user *models.User) error {
	password, err := u.hashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = password
	return u.rp.CreateUser(ctx, user)
}

func (u *UserService) CheckUserExistence(ctx context.Context, user *models.User) (bool, error) {
	usr, err := u.rp.CheckExistence(ctx, user.Login)
	if err != nil || usr == nil {
		return false, err
	}
	return u.checkPasswordHash(user.Password, usr.Password), nil
}
