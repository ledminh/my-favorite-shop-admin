"use client";

import { Category, WithID } from "@/types";
import ItemCard from "@/components/layout/CatProdList/ItemCard";

import { FC, useEffect, useState } from "react";
import { itemsPerPage } from "@/config";

import Image, { StaticImageData } from "next/image";

export type AddNewButtonType = {
  text: string;
  image: StaticImageData;
};

type CatProdListProps<T> = {
  loading: boolean;
  isAdding: boolean;
  isEditing: boolean;
  isDeleting: boolean;

  setLoading: (loading: boolean) => void;
  setIsAdding: (isAdding: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  setIsDeleting: (isDeleting: boolean) => void;

  initItems: WithID<T>[];
  total: number;
  onLoadMore: ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => Promise<WithID<T>[]>;

  getImage: (item: WithID<T>) => { src: string; alt: string };
  addNewButton: AddNewButtonType;

  afterAdd: (item: WithID<T>) => void;
  afterEdit: (item: WithID<T>) => void;
  afterDelete: (item: WithID<T>) => void;

  CardContent: FC<{ item: WithID<T> }>;

  categories: WithID<Category>[];

  AddNewModal: FC<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setLoading: (loading: boolean) => void;

    categories: WithID<Category>[];
    afterAdd: (item: WithID<T>) => void;
  }>;

  EditModal: FC<{
    item: WithID<T>;
    isOpen: boolean;
    setLoading: (loading: boolean) => void;
    setIsOpen: (isOpen: boolean) => void;
    afterEdit: (item: WithID<T>) => void;
  }>;

  DeleteModal: FC<{
    item: WithID<T>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setLoading: (loading: boolean) => void;

    afterDelete: (item: WithID<T>) => void;
  }>;
};

export default function CatProdList<T>({
  loading,
  isAdding,
  isEditing,
  isDeleting,
  setIsAdding,
  setIsEditing,
  setIsDeleting,
  initItems,
  total,
  onLoadMore,
  getImage,
  addNewButton,
  afterAdd,
  afterEdit,
  afterDelete,
  CardContent,
  categories,
  AddNewModal,
  EditModal,
  DeleteModal,
}: CatProdListProps<T>) {
  const [items, setItems] = useState(initItems || []);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);

  const [currentItem, setCurrentItem] = useState<WithID<T> | null>(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const onAddNew = () => {
    setIsAddNewModalOpen(true);
  };

  const onEdit = (id: string) => {
    const item = items.find((item) => item.id === id);

    if (item) {
      setCurrentItem(item);
      setIsEditModalOpen(true);
    }
  };

  const onDelete = (id: string) => {
    const item = items.find((item) => item.id === id);

    if (item) {
      setCurrentItem(item);
      setIsDeleteModalOpen(true);
    }
  };

  const _onLoadMore = () => {
    setIsLoadingMore(true);
    onLoadMore({
      offset: items.length,
      limit: itemsPerPage,
    }).then((newItems) => {
      setItems((prevItems) => [...prevItems, ...newItems]);
      setIsLoadingMore(false);
    });
  };

  useEffect(() => {
    setItems(initItems || []);
  }, [initItems]);

  useEffect(() => {
    if (!isAddNewModalOpen && !isEditModalOpen && !isDeleteModalOpen) {
      setCurrentItem(null);
    }
  }, [isAddNewModalOpen, isEditModalOpen, isDeleteModalOpen]);

  return (
    <>
      {
        // Show add new modal
        isAddNewModalOpen && (
          <AddNewModal
            isOpen={isAddNewModalOpen}
            setIsOpen={setIsAddNewModalOpen}
            setLoading={setIsAdding}
            categories={categories}
            afterAdd={afterAdd}
          />
        )
      }
      {
        // Show item modal if currentItem is not null
        currentItem && (
          <EditModal
            item={currentItem}
            isOpen={isEditModalOpen}
            setLoading={setIsEditing}
            setIsOpen={setIsEditModalOpen}
            afterEdit={afterEdit}
          />
        )
      }

      {
        // Show delete modal if currentItem is not null
        currentItem && (
          <DeleteModal
            item={currentItem}
            isOpen={isDeleteModalOpen}
            setLoading={setIsDeleting}
            setIsOpen={setIsDeleteModalOpen}
            afterDelete={afterDelete}
          />
        )
      }

      <div className="flex flex-col justify-center gap-8">
        {
          // Show no items message if there are no items
          items.length === 0 && (
            <p className="text-2xl text-center text-gray-500">
              No items found.
            </p>
          )
        }
        <ul className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:justify-start md:gap-x-[4%] lg:gap-x-[3.5%] xl:gap-x-[2.66%]">
          <li
            key={"add-new"}
            className="overflow-hidden border rounded-lg border-blue-950 md:basis-[48%] lg:basis-[31%] xl:basis-[23%]"
          >
            <AddNewButton {...addNewButton} onClick={onAddNew} />
          </li>

          {isAdding && (
            <li
              key={"adding"}
              className="overflow-hidden border rounded-lg border-blue-950 md:basis-[48%] lg:basis-[31%] xl:basis-[23%]"
            >
              <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 bg-gray-200">
                {/* Animation icon */}
                <svg
                  className="w-12 h-12 text-gray-600 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span className="text-2xl font-semibold">Adding ...</span>
              </div>
            </li>
          )}

          {loading ? (
            <div className="flex items-center justify-center">
              <span className="text-xl font-semibold">Loading ...</span>
            </div>
          ) : (
            items.map((item) => {
              return (
                <li
                  key={item.id}
                  className="overflow-hidden border rounded-lg border-blue-950 md:basis-[48%] lg:basis-[31%] xl:basis-[23%]"
                >
                  <ItemCard
                    item={item}
                    onEdit={onEdit}
                    currentItem={currentItem}
                    isLoading={isAdding || isEditing || isDeleting}
                    onDelete={onDelete}
                    getImage={getImage}
                    CardContent={CardContent}
                  />
                </li>
              );
            })
          )}
        </ul>
        {
          // Show load more button if there are more items to load
          items.length < total && (
            <LoadMoreButton
              onClick={_onLoadMore}
              isLoadingMore={isLoadingMore}
            />
          )
        }
      </div>
    </>
  );
}

/**************************
 * Components
 */
type LoadMoreButtonProps = {
  isLoadingMore: boolean;
  onClick: () => void;
};

const LoadMoreButton = ({ onClick, isLoadingMore }: LoadMoreButtonProps) => (
  <button
    className="flex items-center justify-center w-40 gap-4 py-3 m-auto text-lg font-bold border-2 rounded-lg border-blue-950 hover:bg-gray-200 hover:ring hover:ring-gray-600 active:ring active:ring-gray-600 active:bg-gray-300"
    onClick={onClick}
  >
    <span>LOAD MORE</span>
    {isLoadingMore && <LoadingMoreCircle />}
  </button>
);

const AddNewButton = ({
  text,
  onClick,
  image,
}: AddNewButtonType & { onClick: () => void }) => (
  <button
    className="flex items-center justify-between w-full h-full gap-4 p-4 bg-gray-400 md:justify-center md:flex-col hover:bg-gray-200 active:bg-gray-500"
    onClick={onClick}
  >
    <div className="relative w-32 md:w-1/2">
      <Image src={image} alt="Folder Icon" className="object-cover" />
    </div>
    <div className="flex items-center justify-center basis-full md:basis-auto">
      <span className="text-2xl font-semibold">{text}</span>
    </div>
  </button>
);

const LoadingMoreCircle = () => (
  <svg
    className="w-6 h-6 text-gray-600 animate-spin"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    ></path>
  </svg>
);
