package services

import (
	"context"
	"moscow-hack/internal/models"
)

type HistoryService struct {
	rp HistoryUseRp
}

var _ HistoryUseCase = (*HistoryService)(nil)

func NewHistoryService(rp HistoryUseRp) *HistoryService {
	return &HistoryService{rp: rp}
}

func (h *HistoryService) GetHistoryByLogin(ctx context.Context, login string) ([]*models.History, error) {
	return h.rp.GetHistoryByLoginRp(ctx, login)
}

func (h *HistoryService) StoreHistory(ctx context.Context, history *models.History) error {
	return h.rp.StoreHistoryRp(ctx, history)
}
