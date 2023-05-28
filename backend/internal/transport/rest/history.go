package rest

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"github.com/go-chi/render"
	"moscow-hack/internal/services"
	"net/http"
)

type historyRoutes struct {
	hs services.HistoryUseCase
	a  *authRoutes
}

func newHistoryRoutes(r chi.Router, hs services.HistoryUseCase, a *authRoutes) {
	hr := historyRoutes{hs: hs, a: a}

	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Authenticator)
		r.Get("/history", hr.getHistoryByLogin)
	})
}

func (h *historyRoutes) getHistoryByLogin(w http.ResponseWriter, r *http.Request) {
	str, err := h.a.getClaims(r)
	if err != nil {
		render.Render(w, r, ErrRender(errors.New("error in format")))
		return
	}
	hs, err := h.hs.GetHistoryByLogin(r.Context(), str)
	fmt.Println(err)
	if err != nil {
		render.Render(w, r, ErrRender(errors.New("error in format")))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(hs)
}
