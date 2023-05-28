package services

import (
	"context"
	"moscow-hack/internal/models"
)

type AddressCoordService struct {
	rp AddressCoordRp
}

var _ AddressCoordUseCase = (*AddressCoordService)(nil)

func NewAddressCoordService(rp AddressCoordRp) *AddressCoordService {
	return &AddressCoordService{rp: rp}
}

func (a *AddressCoordService) GetAddresses(ctx context.Context) ([]*models.AddressCoord, error) {
	return a.rp.GetAllAddressCoordinates(ctx)
}
