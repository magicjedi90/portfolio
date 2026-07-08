use crate::models::skill::Skill;
use sqlx::{Error, PgPool};

const SKILL_QUERY: &str = r#"
    SELECT
        id,
        name,
        description,
        official_site_url,
        proficiency,
        parent_id
    FROM skills
"#;

/// Fetches all skills, ordered by ID.
pub async fn fetch_skills(pool: &PgPool) -> Result<Vec<Skill>, Error> {
    let query = format!("{} ORDER BY id ASC", SKILL_QUERY);
    sqlx::query_as::<_, Skill>(&query).fetch_all(pool).await
}

/// Fetches a single skill by ID, or `None` if it does not exist.
pub async fn fetch_skill_by_id(pool: &PgPool, skill_id: i32) -> Result<Option<Skill>, Error> {
    let query = format!("{} WHERE id = $1", SKILL_QUERY);
    sqlx::query_as::<_, Skill>(&query)
        .bind(skill_id)
        .fetch_optional(pool)
        .await
}
