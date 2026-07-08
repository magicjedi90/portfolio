use crate::models::project::Project;
use sqlx::{Error, PgPool};

const PROJECT_SKILLS_QUERY: &str = r#"
    WITH project_skills AS (
        SELECT
            p.id as project_id,
            COALESCE(
                jsonb_agg(
                    jsonb_build_object(
                        'id', s.id,
                        'name', s.name,
                        'description', s.description,
                        'official_site_url', s.official_site_url,
                        'proficiency', s.proficiency
                    ) ORDER BY s.name ASC
                ) FILTER (WHERE s.id IS NOT NULL),
                '[]'::jsonb
            ) as skills
        FROM projects p
        LEFT JOIN projects_skills ps ON p.id = ps.project_id
        LEFT JOIN skills s ON ps.skill_id = s.id
        GROUP BY p.id
    )
    SELECT
        p.id,
        p.name,
        p.description,
        p.github_url,
        p.job_id,
        COALESCE(ps.skills, '[]'::jsonb) as skills
    FROM projects p
    LEFT JOIN project_skills ps ON p.id = ps.project_id
"#;

/// Fetches all projects with their skills, ordered by ID.
pub async fn fetch_projects(pool: &PgPool) -> Result<Vec<Project>, Error> {
    let query = format!("{} ORDER BY id ASC", PROJECT_SKILLS_QUERY);
    sqlx::query_as::<_, Project>(&query).fetch_all(pool).await
}

/// Fetches a single project by ID, or `None` if it does not exist.
pub async fn fetch_project_by_id(pool: &PgPool, project_id: i32) -> Result<Option<Project>, Error> {
    let query = format!("{} WHERE p.id = $1", PROJECT_SKILLS_QUERY);
    sqlx::query_as::<_, Project>(&query)
        .bind(project_id)
        .fetch_optional(pool)
        .await
}

/// Fetches all projects associated with the given job, ordered by ID.
pub async fn fetch_projects_by_job(pool: &PgPool, job_id: i32) -> Result<Vec<Project>, Error> {
    let query = format!(
        "{} WHERE p.job_id = $1 ORDER BY id ASC",
        PROJECT_SKILLS_QUERY
    );
    sqlx::query_as::<_, Project>(&query)
        .bind(job_id)
        .fetch_all(pool)
        .await
}

/// Fetches all projects that use the given skill (via the projects_skills mapping table), ordered by ID.
pub async fn fetch_projects_by_skill(pool: &PgPool, skill_id: i32) -> Result<Vec<Project>, Error> {
    let query = format!(
        "{} WHERE p.id IN (SELECT project_id FROM projects_skills WHERE skill_id = $1) ORDER BY id ASC",
        PROJECT_SKILLS_QUERY
    );
    sqlx::query_as::<_, Project>(&query)
        .bind(skill_id)
        .fetch_all(pool)
        .await
}
