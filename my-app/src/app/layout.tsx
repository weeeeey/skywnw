import { ClientOnly, Navbar } from './component';
import { getCurrentUser } from '@/app/actions/';
import { RegisterModal, LoginModal, RentModal } from './component/modals';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import SearchModal from './component/modals/SearchModal';

export const metadata = {
    title: 'Skywnw',
    description: 'reservation page',
};

const font = Nunito({
    subsets: ['latin'],
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="en">
            <body className={font.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <SearchModal />
                    <RentModal />
                    <LoginModal />
                    <RegisterModal />
                    <Navbar currentUser={currentUser} />
                </ClientOnly>
                <div className="pb-20 pt-28">{children}</div>
            </body>
        </html>
    );
}
