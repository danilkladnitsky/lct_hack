package services

import (
	"context"
	"moscow-hack/internal/models"
)

type IncidentsService struct {
	rp IncidentsRp
}

var _ IncidentsUseCase = (*IncidentsService)(nil)

func NewIncidentsService(rp IncidentsRp) *IncidentsService {
	return &IncidentsService{rp: rp}
}

func (i *IncidentsService) GetIncidentSources(ctx context.Context) ([]*string, error) {
	return i.rp.GetSources(ctx)
}

func (i *IncidentsService) GetIncidentsCount(ctx context.Context) ([]*models.IncidentCount, error) {
	return i.rp.GetCountOfIncidents(ctx)
}

func (i *IncidentsService) GetIncidentsByUnom(ctx context.Context, unom int64) ([]*models.IncidentWithUnom, error) {
	return i.rp.GetIncidentsUnom(ctx, unom)
}
