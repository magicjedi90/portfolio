pub mod jobs;
pub mod projects;
pub mod skills;

use axum::Json;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Serialize;
use tracing::error;

/// Converts a list query result into a response: 200 with JSON, or 500 on database error.
///
/// `resource` is the plural resource name, e.g. "jobs".
fn list_response<T: Serialize>(result: Result<Vec<T>, sqlx::Error>, resource: &str) -> Response {
    match result {
        Ok(items) => (StatusCode::OK, Json(items)).into_response(),
        Err(e) => {
            error!("Failed to fetch {}: {:?}", resource, e);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to fetch {}", resource),
            )
                .into_response()
        }
    }
}

/// Converts a single-item query result into a response: 200 with JSON when found,
/// 404 when missing, or 500 on database error.
///
/// `resource` is the capitalized singular resource name, e.g. "Job".
fn item_response<T: Serialize>(result: Result<Option<T>, sqlx::Error>, resource: &str) -> Response {
    match result {
        Ok(Some(item)) => (StatusCode::OK, Json(item)).into_response(),
        Ok(None) => (StatusCode::NOT_FOUND, format!("{} not found", resource)).into_response(),
        Err(e) => {
            error!("Failed to fetch {}: {:?}", resource, e);
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to fetch {}", resource.to_lowercase()),
            )
                .into_response()
        }
    }
}
