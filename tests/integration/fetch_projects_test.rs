use crate::integration::test_utils::{get, get_json};
use portfolio_api::models::project::Project;

#[tokio::test]
async fn test_fetch_projects_integration() {
    let projects: Vec<Project> = get_json("/projects").await;
    assert!(!projects.is_empty(), "Projects should not be empty");
}

#[tokio::test]
async fn test_fetch_project_by_id_integration() {
    let project: Project = get_json("/projects/10").await;
    assert_eq!(project.id, 10, "Expected project ID to be 10");
}

#[tokio::test]
async fn test_fetch_projects_by_job_integration() {
    let job_id = 1;
    let projects: Vec<Project> = get_json(&format!("/projects/job/{}", job_id)).await;

    // Verify that all returned projects have the specified job_id
    for project in &projects {
        assert_eq!(
            project.job_id,
            Some(job_id),
            "All projects should have job_id = {}",
            job_id
        );
    }
}

#[tokio::test]
async fn test_fetch_projects_by_skill_integration() {
    let skill_id = 10;
    let projects: Vec<Project> = get_json(&format!("/projects/skill/{}", skill_id)).await;

    assert!(
        !projects.is_empty(),
        "Should return at least one project with skill ID {}",
        skill_id
    );

    // Verify at least one project has the skill with the specified ID
    let has_skill = projects
        .iter()
        .any(|p| p.skills.iter().any(|s| s.id == skill_id));
    assert!(
        has_skill,
        "At least one project should have the skill with ID {}",
        skill_id
    );
}

#[tokio::test]
async fn test_fetch_project_by_id_not_found_integration() {
    let response = get("/projects/9999").await;
    assert_eq!(response.status(), 404);
}
