"use client";

import { useCallback, useMemo } from "react";
import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCountries } from "@/app/hooks";
import { format } from "date-fns";
import Image from "next/image";

interface ListingCardProps {
    data: Listing;
    currentUser?: SafeUser | null;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
}
const LisingCard = ({
    data,
    currentUser,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
}: ListingCardProps) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) {
                return;
            }
            onAction?.(actionId);
        },
        [onAction, actionId, disabled]
    );

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, "PP")} ~ ${format(end, "PP")}`;
    }, [reservation]);
    return (
        <div
            className="col-span-1 cursor-pointer group"
            onClick={() => {
                router.push(`listings/${data.id}`);
            }}
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        alt="Listing"
                        src={data.imageSrc}
                        fill
                        className="object-cover h-full w-full transition group-hover:scale-110"
                    />
                </div>
            </div>
        </div>
    );
};

export default LisingCard;
