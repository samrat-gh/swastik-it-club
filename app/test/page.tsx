'use client';

import { createUser } from '../_actions/user';

const Page = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const data = await createUser({
      email: 'bibukbv',
      name: 'jkbkbk',
      image: 'bjbbibv',
    });
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-[30%] w-fit">
      <button type="submit">Create</button>
    </form>
  );
};

export default Page;
