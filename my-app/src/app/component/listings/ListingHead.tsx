"use client";

import { useCountries } from "@/app/hooks";
import { SafeUser } from "../../types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;
}
const ListingHead = ({
    currentUser,
    id,
    imageSrc,
    locationValue,
    title,
}: ListingHeadProps) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <div>
            <Heading
                title={title}
                subTitle={`${location?.region}, ${location?.label}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    alt="Image"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </div>
    );
};

export default ListingHead;
