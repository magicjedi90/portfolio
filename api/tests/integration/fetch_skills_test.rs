use crate::integration::test_utils::get_json;
use portfolio_api::models::skill::Skill;

#[tokio::test]
async fn test_fetch_skills_integration() {
    let skills: Vec<Skill> = get_json("/skills").await;
    assert!(!skills.is_empty(), "Skills should not be empty");
}

#[tokio::test]
async fn test_fetch_skill_by_id_integration() {
    let skill: Skill = get_json("/skills/1").await;
    assert_eq!(skill.id, 1, "Expected skill ID to be 1");
}
