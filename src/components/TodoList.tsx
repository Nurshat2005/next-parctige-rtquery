'use client';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import scss from './TodoList.module.scss';
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodoQuery,
  usePostTodoMutation,
  useUploadFileMutation,
} from '@/redux/api/todo';
import Image from 'next/image';

interface IUpload {
  file: FileList;
  url: string;
  title: string;
  price: number;
}

const TodoList: FC = () => {
  const { register, handleSubmit, reset, setValue } = useForm<IUpload>();
  const { data } = useGetTodoQuery();
  const [saveTodo] = usePostTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodoMutation] = useEditTodoMutation();
  const [uploadFileMutation] = useUploadFileMutation();
  const [edit, setEdit] = useState<number | null>(null);

  const editTodo: SubmitHandler<IUpload> = async (formData, id: number) => {
    try {
      const file = formData.file[0];
      const formDataObj = new FormData();
      formDataObj.append('file', file);
      const { data: responsefile } = await uploadFileMutation(formDataObj);
      const newData = {
        image: responsefile.url,
        url: formData.url,
        title: formData.title,
        price: formData.price,
      };
      await editTodoMutation({ _id: id, newData });
      reset();
      setValue('file', {} as FileList);
      setValue('url', '');
      setValue('title', '');
      setValue('price', 0);
      setEdit(null);
    } catch (error) {
      console.log(error);
    }
  };

  const saveData: SubmitHandler<IUpload> = async (formData) => {
    try {
      const file = formData.file[0];
      const formDataObj = new FormData();
      formDataObj.append('file', file);

      const { data: responsefile } = await uploadFileMutation(formDataObj);

      const newData = {
        image: responsefile.url,
        url: formData.url,
        title: formData.title,
        price: formData.price,
      };
      await saveTodo(newData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={scss.TodoList}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.blogForm}>
            <form onSubmit={handleSubmit(saveData)}>
              <input type="file" {...register('file', { required: true })} />
              <input type="text" {...register('url', { required: true })} placeholder="url" />
              <input type="text" {...register('title', { required: true })} placeholder="title" />
              <input type="number" {...register('price', { required: true })} placeholder="price" />
              <button type="submit">SAVE</button>
            </form>
          </div>
          {data?.map((el) => (
            <div className={scss.blog} key={el._id}>
              <Image
                src={el.image}
                alt="images"
                width={200}
                height={200}
                objectFit="contain"
                quality={100}
              />
              <Image src={el?.url} alt="img" width={200} height={200} objectFit="contain" />
              <h1>{el.title}</h1>
              <h3>{el.price}$</h3>
              <button className={scss.deleteBnt} onClick={() => deleteTodo(el._id)}>
                Delete
              </button>
              {edit === el._id ? (
                <form onSubmit={handleSubmit((formData) => editTodo(formData, el._id))}>
                  <input type="file" {...register('file', { required: true })} />
                  <input type="text" {...register('url', { required: true })} placeholder="img" />
                  <input
                    type="title"
                    {...register('title', { required: true })}
                    placeholder="title"
                  />
                  <input
                    type="text"
                    {...register('price', { required: true })}
                    placeholder="price"
                  />
                  <button onClick={() => setEdit(el._id)}>Edit</button>
                </form>
              ) : (
                <button className={scss.editBtn} onClick={() => setEdit(el._id)}>
                  EditTa
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodoList;
