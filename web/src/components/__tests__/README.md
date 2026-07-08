# Component Tests

This directory contains unit tests for the React components in the project.

## Running Tests

To run the tests, use the following commands:

```bash
# Run all tests once
npm test

# Run tests in watch mode (useful during development)
npm run test:watch
```

## Test Files

- `Header.test.tsx`: Tests for the Header component
- `Jobs.test.tsx`: Tests for the Jobs component
- `Projects.test.tsx`: Tests for the Projects component

## Testing Strategy

Each component test file follows a similar pattern:

1. Import the component and necessary testing utilities
2. Create mock data that matches the expected props
3. Test that the component renders correctly with valid props
4. Test edge cases (e.g., empty arrays, null values)
5. Test any conditional rendering or logic in the component

## Adding New Tests

When adding new components to the project, follow these steps to create tests:

1. Create a new test file in this directory with the naming convention `ComponentName.test.tsx`
2. Import the component and necessary testing utilities
3. Create mock data that matches the expected props
4. Write tests that cover the component's functionality
5. Run the tests to ensure they pass