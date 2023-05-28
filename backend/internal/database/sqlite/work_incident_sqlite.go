package sqlite

import (
	"context"
	"fmt"
	"gorm.io/gorm"
	"moscow-hack/internal/services"
)

type WorkIncidentRepo struct {
	db *gorm.DB
}

var _ services.WorkIncidentRp = (*WorkIncidentRepo)(nil)

func NewWorkIncidentRepo(db *gorm.DB) *WorkIncidentRepo {
	return &WorkIncidentRepo{db: db}
}

func (w *WorkIncidentRepo) GetWorkNames(ctx context.Context) ([]*string, error) {
	var workNames []*string
	if err := w.db.WithContext(ctx).Table("work_incident").Distinct("work_name").Find(&workNames).Error; err != nil {
		return nil, fmt.Errorf("cannot create query: %w", err)
	}
	return workNames, nil
}
