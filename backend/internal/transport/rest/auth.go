package rest

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"github.com/go-chi/render"
	"moscow-hack/internal/models"
	"moscow-hack/internal/services"
	"net/http"
	"time"
)

type authRoutes struct {
	TokenAuth *jwtauth.JWTAuth
	us        services.UserUseCase
}

func newAuthRoutes(c chi.Router, tkn *jwtauth.JWTAuth, us services.UserUseCase) {
	au := authRoutes{TokenAuth: tkn, us: us}
	c.Group(func(r chi.Router) {

		r.Group(func(r chi.Router) {
			r.Use(au.authCtx)
			r.Post("/register", au.register)
			r.Post("/login", au.login)
		})
		r.Group(func(r chi.Router) {
			r.Use(jwtauth.Authenticator)
			r.Get("/authInfo", au.authInfo)
			r.Get("/logout", au.logout)
		})
	})
}

func (a *authRoutes) makeToken(login string) string {
	_, tokenString, _ := a.TokenAuth.Encode(map[string]interface{}{"login": login})
	return tokenString
}

func (a *authRoutes) getClaims(r *http.Request) (string, error) {
	claims := jwtauth.TokenFromCookie(r)
	token, err := a.TokenAuth.Decode(claims)
	if err != nil {
		return "", err
	}
	login, rs := token.Get("login")
	if rs {
		return login.(string), nil
	}
	return "", nil
}

func (a *authRoutes) authCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var user models.User
		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			render.Render(w, r, ErrRender(err))
			return
		}
		if user.Login == "" || user.Password == "" || len(user.Password) < 8 || len(user.Password) > 32 {
			render.Render(w, r, ErrRender(errors.New("error in values format")))
			return
		}
		ctx := context.WithValue(r.Context(), "user", &user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (a *authRoutes) register(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value("user").(*models.User)
	err := a.us.CreateNewUser(r.Context(), user)
	if err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}

	http.SetCookie(w, &http.Cookie{
		HttpOnly: true,
		Expires:  time.Now().Add(7 * 24 * time.Hour),
		SameSite: http.SameSiteLaxMode,
		Name:     "jwt",
		Value:    a.makeToken(user.Login),
	})
}

func (a *authRoutes) login(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value("user").(*models.User)
	rs, err := a.us.CheckUserExistence(r.Context(), user)
	if err != nil || rs == false {
		render.Render(w, r, ErrRender(err))
		return
	}
	http.SetCookie(w, &http.Cookie{
		HttpOnly: true,
		Expires:  time.Now().Add(7 * 24 * time.Hour),
		SameSite: http.SameSiteLaxMode,
		Name:     "jwt",
		Value:    a.makeToken(user.Login),
	})
}

func (a *authRoutes) logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		HttpOnly: true,
		MaxAge:   -1,
		SameSite: http.SameSiteLaxMode,
		Name:     "jwt",
		Value:    "",
	})
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func (a *authRoutes) authInfo(w http.ResponseWriter, r *http.Request) {
	login, err := a.getClaims(r)
	if err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
	render.JSON(w, r, login)
}
