package services

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"moscow-hack/internal/models"
	"net/http"
	"strconv"
	"time"
)

type MLService struct {
	ar AddressCoordRp
	hs HistoryUseCase
}

var _ MLUseCase = (*MLService)(nil)

func NewMLService(ar AddressCoordRp, hs HistoryUseCase) *MLService {
	return &MLService{ar: ar, hs: hs}
}

func (m *MLService) CreateRequestForML(ctx context.Context, login string, ml *models.MLData) (*models.HistoryItem, error) {
	hs := &models.History{Login: login}
	b, err := json.Marshal(ml)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	hs.Request = string(b)
	//запрос в ml
	var hist models.HistoryItem
	for _, unom := range ml.Unom {
		unomStr := strconv.FormatInt(unom, 10)
		postBody, err := json.Marshal(map[string]interface{}{
			"unom":       unomStr,
			"source":     ml.Source,
			"work_type":  ml.WorkType,
			"start_date": ml.StartDate,
			"end_date":   ml.EndDate,
		})
		if err != nil {
			log.Println(err)
		}
		resp, err := http.Post("https://service.lct.x1kk4.ru/model_state_works", "application/json", bytes.NewBuffer(postBody))
		if err != nil {
			return nil, err
		}
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Println(string(body))
		mlResp := models.MLResponse{}
		err = json.Unmarshal(body, &mlResp)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		fmt.Println(mlResp)
		resp.Body.Close()
		address, err := m.ar.GetAddressInfoByUnom(ctx, mlResp.Unom)
		if err != nil {
			return nil, err
		}
		histItem := models.HistoryItem{
			Address:   address.Address,
			Unom:      mlResp.Unom,
			Latitude:  address.Latitude,
			Longitude: address.Longitude,
			WorkType:  mlResp.WorkType,
		}
		hist = histItem
		b1, err := json.Marshal(histItem)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		hs.Response = string(b1)
		hs.CreatedAt = time.Now().String()
		err = m.hs.StoreHistory(ctx, hs)
		if err != nil {
			return nil, err
		}
	}
	return &hist, nil
}
