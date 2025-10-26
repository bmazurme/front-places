import React from 'react';

type WithConfirmType = {
  card: Card;
  title: string;
  buttonText: string;
  isLoading: boolean;
  onSubmit: (c: Card) => void;
};

export default function WithConfirm({
  card, title, buttonText, onSubmit, isLoading,
}: WithConfirmType) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <form
      className="form"
      name="confirm-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="title">{title}</h2>
      <button aria-label="Delete" className="submit" type="submit">
        {isLoading ? 'Deleting...' : buttonText}
      </button>
    </form>
  );
}
