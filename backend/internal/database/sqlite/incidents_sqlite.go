package sqlite

import (
	"context"
	"fmt"
	"gorm.io/gorm"
	"moscow-hack/internal/models"
	"moscow-hack/internal/services"
)

type IncidentsRepo struct {
	db *gorm.DB
}

var _ services.IncidentsRp = (*IncidentsRepo)(nil)

func NewIncidentsRepo(db *gorm.DB) *IncidentsRepo {
	return &IncidentsRepo{db: db}
}

func (i *IncidentsRepo) GetSources(ctx context.Context) ([]*string, error) {
	var sources []*string
	if err := i.db.WithContext(ctx).Table("incidents").Distinct("source").Find(&sources).Error; err != nil {
		return nil, fmt.Errorf("cannot create query: %w", err)
	}
	return sources, nil
}

func (i *IncidentsRepo) GetCountOfIncidents(ctx context.Context) ([]*models.IncidentCount, error) {
	var incidentsCounters []*models.IncidentCount
	if err := i.db.WithContext(ctx).Table("build").Select("COUNT(*) as count, incidents.unom as unom").
		Joins("inner join incidents ON build.unom = incidents.unom").Group("incidents.unom").Scan(&incidentsCounters).Error; err != nil {
		return nil, fmt.Errorf("cannot create query: %w", err)
	}
	return incidentsCounters, nil
}

func (i *IncidentsRepo) GetIncidentsUnom(ctx context.Context, unom int64) ([]*models.IncidentWithUnom, error) {
	var incUnom []*models.IncidentWithUnom
	if err := i.db.WithContext(ctx).Table("build").Select("incidents.name as incident_name, incidents.unom as unom, address, longitude, latitude").
		Joins("join incidents ON build.unom = incidents.unom").
		Joins(" join address_coord ON address_coord.unom = incidents.unom").Where("incidents.unom = ?", unom).
		Scan(&incUnom).Error; err != nil {
		return nil, fmt.Errorf("cannot create query: %w", err)
	}
	return incUnom, nil
}
