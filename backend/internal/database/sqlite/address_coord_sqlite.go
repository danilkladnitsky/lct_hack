package sqlite

import (
	"context"
	"fmt"
	"gorm.io/gorm"
	"moscow-hack/internal/models"
	"moscow-hack/internal/services"
)

type AddressCoordRepo struct {
	db *gorm.DB
}

var _ services.AddressCoordRp = (*AddressCoordRepo)(nil)

func NewAddressCoordRepo(db *gorm.DB) *AddressCoordRepo {
	return &AddressCoordRepo{db: db}
}

func (a *AddressCoordRepo) GetAllAddressCoordinates(ctx context.Context) ([]*models.AddressCoord, error) {
	var addresses []*models.AddressCoord
	if err := a.db.WithContext(ctx).Table("address_coord").Find(&addresses).Error; err != nil {
		return nil, fmt.Errorf("cannot create query: %w", err)
	}
	return addresses, nil
}

func (a *AddressCoordRepo) GetAddressInfoByUnom(ctx context.Context, unom int64) (*models.AddressCoord, error) {
	var addr *models.AddressCoord
	if err := a.db.WithContext(ctx).Table("address_coord").Select("address, longitude, latitude").Where("address_coord.unom = ?", unom).Find(addr).Error; err != nil {
		return nil, err
	}
	return addr, nil
}
