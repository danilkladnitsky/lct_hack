package services

import (
	"context"
	"moscow-hack/internal/models"
)

//"SELECT * FROM address_coord" - доступные здания и их адреса
//SELECT distinct source FROM incidents - источники
//SELECT distinct work_name FROM work_incident

type (

	//Repositories

	AddressCoordRp interface {
		GetAllAddressCoordinates(context.Context) ([]*models.AddressCoord, error)
		GetAddressInfoByUnom(ctx context.Context, unom int64) (*models.AddressCoord, error)
	}

	IncidentsRp interface {
		GetSources(context.Context) ([]*string, error)
		GetCountOfIncidents(ctx context.Context) ([]*models.IncidentCount, error)
		GetIncidentsUnom(ctx context.Context, unom int64) ([]*models.IncidentWithUnom, error)
	}

	WorkIncidentRp interface {
		GetWorkNames(context.Context) ([]*string, error)
	}

	UserRp interface {
		CreateUser(context.Context, *models.User) error
		CheckExistence(context.Context, string) (*models.User, error)
	}

	HistoryUseRp interface {
		GetHistoryByLoginRp(context.Context, string) ([]*models.History, error)
		StoreHistoryRp(context.Context, *models.History) error
	}

	// Services

	AddressCoordUseCase interface {
		GetAddresses(context.Context) ([]*models.AddressCoord, error)
	}

	IncidentsUseCase interface {
		GetIncidentSources(context.Context) ([]*string, error)
		GetIncidentsCount(ctx context.Context) ([]*models.IncidentCount, error)
		GetIncidentsByUnom(ctx context.Context, unom int64) ([]*models.IncidentWithUnom, error)
	}

	WorkIncidentUseCase interface {
		GetNames(context.Context) ([]*string, error)
	}

	ChooseTypesUseCase interface {
		GetChooseTypesList(context.Context) (*models.ChooseType, error)
	}

	UserUseCase interface {
		CreateNewUser(context.Context, *models.User) error
		CheckUserExistence(ctx context.Context, user *models.User) (bool, error)
	}

	MLUseCase interface {
		CreateRequestForML(ctx context.Context, login string, ml *models.MLData) error
	}

	HistoryUseCase interface {
		GetHistoryByLogin(context.Context, string) ([]*models.History, error)
		StoreHistory(context.Context, *models.History) error
	}
)
