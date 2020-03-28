package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type WaypointList struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Waypoints []float32          `json:"waypoints,omitempty"`
}
