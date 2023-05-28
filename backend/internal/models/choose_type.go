package models

type ChooseType struct {
	Source    []*string       `json:"source"`
	WorkType  []*string       `json:"work_type"`
	Addresses []*AddressCoord `json:"addresses"`
}
