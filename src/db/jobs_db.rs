use crate::models::job::Job;
use sqlx::{Error, PgPool};

const JOB_QUERY: &str = r#"
    SELECT
        id,
        start_date,
        end_date,
        is_current_job,
        company_name,
        company_website,
        description,
        roles,
        responsibilities
    FROM jobs
"#;

/// Fetches all jobs, most recent first.
pub async fn fetch_jobs(pool: &PgPool) -> Result<Vec<Job>, Error> {
    let query = format!("{} ORDER BY start_date DESC", JOB_QUERY);
    sqlx::query_as::<_, Job>(&query).fetch_all(pool).await
}

/// Fetches a single job by ID, or `None` if it does not exist.
pub async fn fetch_job_by_id(pool: &PgPool, job_id: i32) -> Result<Option<Job>, Error> {
    let query = format!("{} WHERE id = $1", JOB_QUERY);
    sqlx::query_as::<_, Job>(&query)
        .bind(job_id)
        .fetch_optional(pool)
        .await
}
