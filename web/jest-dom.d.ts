// jest-dom.d.ts
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toContainHTML(html: string): R;
      toHaveTextContent(text: string | RegExp): R;
      // Add other custom matchers as needed
    }
  }
}