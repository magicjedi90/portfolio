# Component Tests

Unit tests for the React components in this project. One test file per component, named `ComponentName.test.tsx`.

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (useful during development)
npm run test:watch
```

## Testing Strategy

Each component test file follows the same pattern:

1. Import the component and necessary testing utilities
2. Create mock data that matches the expected props (for API-backed components, match the generated API types)
3. Test that the component renders correctly with valid props
4. Test edge cases (e.g., empty arrays, null values)
5. Test any conditional rendering or logic in the component
