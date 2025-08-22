For styling, use CSS modules. Create a .module.css file with the same name as your component (e.g., MyComponent.module.css) and import it in your component file.
Use nesting and '&' in your CSS for better structure and readability. Use media queries inside classes blocks for responsive design. Use mobile first approach.
Use tokens defined in global.css for colors, spacing, and other design elements.
Never use !important. You must check the specificity of your selectors and adjust them accordingly.
If you need to add multiple classnames, use clsx.
Use descriptive class and variable names; NEVER use abbreviations.
Never create barrel files.
Never create documentation files unless explicitly requested.
Use top-down rule when writing code. Start writing the parent component first, and then the child components in the order they are used. For types, write first the main type and then the types that are used within it.
Use TypeScript interfaces for objects.
Do NOT add unnecessary comments.
