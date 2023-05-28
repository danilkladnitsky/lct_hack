package services

import (
	"context"
	"encoding/json"
	"fmt"
	"moscow-hack/internal/models"
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

func (m *MLService) CreateRequestForML(ctx context.Context, login string, ml *models.MLData) error {
	hs := &models.History{Login: login}
	b, err := json.Marshal(ml)
	if err != nil {
		fmt.Println(err)
		return err
	}
	hs.Request = string(b)
	//запрос в ml
	//postBody, _ := json.Marshal(map[string]string{
	//	"name":  "Toby",
	//	"email": "Toby@example.com",
	//})
	//resp, err := http.Post("", "application/json", bytes.NewBuffer(postBody))
	//if err != nil {
	//	return err
	//}
	//defer resp.Body.Close()
	//body, err := ioutil.ReadAll(resp.Body)
	//if err != nil {
	//	log.Fatalln(err)
	//}
	//mlResp := models.MLResponse{}
	//err = json.Unmarshal(body, &mlResp)
	//if err != nil {
	//	return err
	//}
	mlResp := models.MLResponse{
		Unom:     24033,
		WorkType: []string{"\u0440\u0435\u043c\u043e\u043d\u0442 \u0444\u0443\u043d\u0434\u0430\u043c\u0435\u043d\u0442\u0430"},
	}
	address, err := m.ar.GetAddressInfoByUnom(ctx, mlResp.Unom)
	if err != nil {
		return err
	}
	histItem := models.HistoryItem{
		Address:   address.Address,
		Unom:      address.Unom,
		Latitude:  address.Latitude,
		Longitude: address.Longitude,
		WorkType:  mlResp.WorkType,
	}
	b1, err := json.Marshal(histItem)
	if err != nil {
		fmt.Println(err)
		return err
	}
	hs.Response = string(b1)
	hs.CreatedAt = time.Now()
	err = m.hs.StoreHistory(ctx, hs)
	if err != nil {
		return err
	}
	return nil
}
