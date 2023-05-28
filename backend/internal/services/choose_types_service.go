package services

import (
	"context"
	"moscow-hack/internal/models"
)

type ChooseTypesService struct {
	ac AddressCoordUseCase
	is IncidentsUseCase
	wi WorkIncidentUseCase
}

var _ ChooseTypesUseCase = (*ChooseTypesService)(nil)

func NewChooseTypesUseCase(ac AddressCoordUseCase, is IncidentsUseCase, wi WorkIncidentUseCase) *ChooseTypesService {
	return &ChooseTypesService{
		ac: ac,
		is: is,
		wi: wi,
	}
}

func (c *ChooseTypesService) GetChooseTypesList(ctx context.Context) (*models.ChooseType, error) {
	ch := &models.ChooseType{}
	sc, err := c.is.GetIncidentSources(ctx)
	if err != nil {
		return nil, err
	}
	ch.Source = sc
	wt, err := c.wi.GetNames(ctx)
	if err != nil {
		return nil, err
	}
	ch.WorkType = wt
	addrList, err := c.ac.GetAddresses(ctx)
	if err != nil {
		return nil, err
	}
	ch.Addresses = addrList
	return ch, nil
}
