package services

import "context"

type WorkIncidentService struct {
	rp WorkIncidentRp
}

var _ WorkIncidentUseCase = (*WorkIncidentService)(nil)

func NewWorkIncidentService(rp WorkIncidentRp) *WorkIncidentService {
	return &WorkIncidentService{rp: rp}
}

func (w *WorkIncidentService) GetNames(ctx context.Context) ([]*string, error) {
	return w.rp.GetWorkNames(ctx)
}
