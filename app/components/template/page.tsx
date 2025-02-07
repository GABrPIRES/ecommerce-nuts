export interface HomepageProps {
    children: any
}

export default function Homepage(props: HomepageProps) {
    return (
        <div className="mt-[40px] min-h-screen pt-40 p-10 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
            {props.children}
        </div>
    );
}