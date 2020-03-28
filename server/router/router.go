package router

import (
	"../middleware"
	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/task", middleware.GetWaypoints).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/task", middleware.AddKnot).Methods("POST", "OPTIONS")
	return router
}