const NAME_PATTERN = {
  value: /^[\s+$.a-zA-Z0-9_'-]{3,25}$/,
  message: "Use 3-25 characters: letters, numbers, spaces, and _ - . $ + '",
};

export const inputs = [
  {
    name: 'name',
    label: 'Place name',
    placeholder: 'e.g. Kemer',
    pattern: NAME_PATTERN,
    required: true,
    autoComplete: 'off',
  },
  {
    name: 'tagName',
    label: 'Tag',
    placeholder: 'sea, autumn …',
    pattern: NAME_PATTERN,
    required: true,
    autoComplete: 'off',
  },
] as const;
