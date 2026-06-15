const VALUE_PATTERN = {
  value: /^[\s+$.a-zA-Z0-9_'-]{3,25}$/,
  message: "Use 3-25 characters: letters, numbers, spaces, and _ - . $ + '",
};

export const inputs = [
  {
    name: 'name',
    label: 'Name',
    pattern: VALUE_PATTERN,
    required: true,
    autoComplete: 'current-name',
  },
  {
    name: 'about',
    label: 'About',
    pattern: VALUE_PATTERN,
    required: true,
    type: 'about',
    autoComplete: 'current-about',
  },
] as const;
