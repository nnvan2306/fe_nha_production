export default function PageDetail({
    params: { slug },
}: {
    params: { slug: string };
}) {
    return <div className="">{slug}</div>;
}
