package pg

import (
	"context"
	"fmt"
	"gorm.io/gorm"
	"moscow-hack/internal/models"
	"moscow-hack/internal/services"
)

type HistoryRepo struct {
	db *gorm.DB
}

var _ services.HistoryUseRp = (*HistoryRepo)(nil)

func NewHistoryRepo(db *gorm.DB) *HistoryRepo {
	return &HistoryRepo{db: db}
}

func (h *HistoryRepo) GetHistoryByLoginRp(ctx context.Context, login string) ([]*models.History, error) {
	var hist []*models.History
	if err := h.db.WithContext(ctx).Select("histories").Where("login = ?", login).Find(&hist).Error; err != nil {
		return nil, err
	}
	return nil, nil
}

func (h *HistoryRepo) StoreHistoryRp(ctx context.Context, history *models.History) error {
	if err := h.db.WithContext(ctx).Table("histories").Create(history).Error; err != nil {
		return fmt.Errorf("cannot create query: %w", err)
	}
	return nil
}
