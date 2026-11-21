"use client";

import * as React from "react";
import { ArrowUpRight, CreditCard, Download } from "lucide-react";
import {
  Alert,
  Badge,
  type BadgeStatus,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToastProvider,
  Tooltip,
  Typography,
  useToast,
} from "@/components";

/* ---------- Data ---------- */

type Plan = { name: string; price: number; seats: number };
const PLANS: Record<"team" | "business", Plan> = {
  team: { name: "Team", price: 48, seats: 10 },
  business: { name: "Business", price: 96, seats: 50 },
};

type InvoiceStatus = "paid" | "open" | "failed" | "refunded";
type Invoice = { id: string; date: string; period: string; amount: number; status: InvoiceStatus };

const INVOICES: Invoice[] = [
  { id: "INV-2026-011", date: "Nov 14, 2026", period: "Nov 14 – Dec 13", amount: 48, status: "failed" },
  { id: "INV-2026-010", date: "Oct 14, 2026", period: "Oct 14 – Nov 13", amount: 48, status: "paid" },
  { id: "INV-2026-009", date: "Sep 14, 2026", period: "Sep 14 – Oct 13", amount: 48, status: "paid" },
  { id: "INV-2026-008", date: "Aug 14, 2026", period: "Aug 14 – Sep 13", amount: 40, status: "refunded" },
  { id: "INV-2026-007", date: "Jul 14, 2026", period: "Jul 14 – Aug 13", amount: 40, status: "paid" },
  { id: "INV-2026-006", date: "Jun 14, 2026", period: "Jun 14 – Jul 13", amount: 40, status: "paid" },
];

const STATUS: Record<InvoiceStatus, { label: string; badge: BadgeStatus }> = {
  paid: { label: "Paid", badge: "positive" },
  open: { label: "Open", badge: "notice" },
  failed: { label: "Failed", badge: "negative" },
  refunded: { label: "Refunded", badge: "neutral" },
};

const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

type PaymentCard = { name: string; brand: string; last4: string; expiry: string; country: string };

/* ---------- Page ---------- */

export default function BillingSettingsPage() {
  return (
    <ToastProvider>
      <BillingSettings />
    </ToastProvider>
  );
}

function BillingSettings() {
  const { show } = useToast();
  const [planKey, setPlanKey] = React.useState<"team" | "business">("team");
  const [card, setCard] = React.useState<PaymentCard>({
    name: "Amara Okafor",
    brand: "Visa",
    last4: "4242",
    expiry: "08/28",
    country: "US",
  });
  const [invoices, setInvoices] = React.useState(INVOICES);
  const [paymentOpen, setPaymentOpen] = React.useState(false);

  const failed = invoices.find((i) => i.status === "failed");

  const handleCardSaved = (next: PaymentCard) => {
    setCard(next);
    setPaymentOpen(false);
    // Retrying the failed charge with the new card marks it paid.
    if (failed) setInvoices((all) => all.map((i) => (i.id === failed.id ? { ...i, status: "paid" } : i)));
    show({
      status: "positive",
      title: "Payment method updated",
      description: failed ? `${failed.id} was charged to the card ending ${next.last4}.` : undefined,
    });
  };

  return (
    <main className="min-h-screen bg-static-fill-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-gap-14 px-gap-9 py-gap-14 sm:px-gap-12 sm:py-gap-16">
        <header className="flex flex-col gap-gap-5">
          <Typography as="h1" variant="title-small" tone="strong">
            Billing
          </Typography>
          <Typography variant="body-large" tone="subtle">
            Manage your plan, payment method and invoices for Northwind Studio.
          </Typography>
        </header>

        {failed && (
          <Alert
            status="error"
            position="vertical"
            titleAs="h2"
            title={`Payment for ${failed.id} failed`}
            description={`We couldn't charge ${usd(failed.amount)} to the ${card.brand} ending ${card.last4}. Update your payment method to retry the charge.`}
            actionLabel="Update payment method"
            onAction={() => setPaymentOpen(true)}
          />
        )}

        <div className="grid gap-gap-12 lg:grid-cols-2">
          <CurrentPlanCard planKey={planKey} onUpgraded={() => setPlanKey("business")} />
          <PaymentMethodCard card={card} open={paymentOpen} onOpenChange={setPaymentOpen} onSave={handleCardSaved} />
        </div>

        <InvoicesCard invoices={invoices} />
      </div>
    </main>
  );
}

/* ---------- Current plan ---------- */

function CurrentPlanCard({ planKey, onUpgraded }: { planKey: "team" | "business"; onUpgraded: () => void }) {
  const { show } = useToast();
  const plan = PLANS[planKey];
  const next = PLANS.business;
  const [open, setOpen] = React.useState(false);
  const [upgrading, setUpgrading] = React.useState(false);
  const seatsUsed = 6;
  const planNameRef = React.useRef<HTMLDivElement>(null);

  const upgradedRef = React.useRef(false);
  const upgrade = () => {
    setUpgrading(true);
    upgradedRef.current = true;
    window.setTimeout(() => {
      setUpgrading(false);
      setOpen(false);
      onUpgraded();
      show({ status: "positive", title: `You're on the ${next.name} plan`, description: "New seats are available now." });
    }, 900);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div>
          <CardTitle>Current plan</CardTitle>
          <CardDescription>Renews on Dec 14, 2026</CardDescription>
        </div>
        <Badge status="positive">Active</Badge>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-gap-11">
        {/* Focus target after upgrading, since the Upgrade button no longer exists. */}
        <div ref={planNameRef} tabIndex={-1} className="flex flex-col gap-gap-3 rounded-control-sm focus-visible:outline-none">
          <Typography as="p" variant="subtitle-medium" tone="strong">
            {plan.name}
          </Typography>
          <Typography variant="body-medium" tone="subtle">
            <span className="type-number-strong-medium text-static-text-strong">{usd(plan.price)}</span> per month, billed
            monthly
          </Typography>
        </div>
        <dl className="grid grid-cols-2 gap-gap-9">
          <div className="flex flex-col gap-gap-3">
            <dt className="type-caption-medium text-static-text-subtle">Seats</dt>
            <dd className="m-0 type-label-strong-medium text-static-text-strong">
              {seatsUsed} of {plan.seats} used
            </dd>
          </div>
          <div className="flex flex-col gap-gap-3">
            <dt className="type-caption-medium text-static-text-subtle">Storage</dt>
            <dd className="m-0 type-label-strong-medium text-static-text-strong">{planKey === "team" ? "100 GB" : "1 TB"}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="flex-wrap">
        {planKey === "team" ? (
          <Modal open={open} onOpenChange={setOpen}>
            <ModalTrigger asChild>
              <Button prefixIcon={<ArrowUpRight />}>Upgrade to {next.name}</Button>
            </ModalTrigger>
            <ModalContent
              size="small"
              onCloseAutoFocus={(e) => {
                if (!planNameRef.current || !upgradedRef.current) return;
                e.preventDefault();
                planNameRef.current.focus();
              }}
            >
              <ModalHeader title={`Upgrade to ${next.name}?`} description="Your new price applies straight away." />
              <ModalBody className="flex flex-col gap-gap-9">
                <dl className="flex flex-col gap-gap-7">
                  <SummaryRow term="New price" value={`${usd(next.price)} / month`} />
                  <SummaryRow term="Seats" value={`Up to ${next.seats}`} />
                  <SummaryRow term="Due today (prorated)" value={usd(27.2)} strong />
                </dl>
                <Typography variant="body-small" tone="subtle">
                  Charged to the card on file. You can downgrade at any time from this page.
                </Typography>
              </ModalBody>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="secondary" appearance="border" disabled={upgrading}>
                    Cancel
                  </Button>
                </ModalClose>
                <Button loading={upgrading} onClick={upgrade}>
                  Upgrade and pay {usd(27.2)}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ) : (
          <Typography variant="body-small" tone="subtle" className="mr-auto">
            You&apos;re on our largest self-serve plan.
          </Typography>
        )}
      </CardFooter>
    </Card>
  );
}

function SummaryRow({ term, value, strong }: { term: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-gap-9">
      <dt className="type-body-medium text-static-text-subtle">{term}</dt>
      <dd className={`m-0 ${strong ? "type-number-strong-medium text-static-text-strong" : "type-number-medium text-static-text-base"}`}>
        {value}
      </dd>
    </div>
  );
}

/* ---------- Payment method ---------- */

const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "NG", label: "Nigeria" },
  { value: "DE", label: "Germany" },
];

function PaymentMethodCard({
  card,
  open,
  onOpenChange,
  onSave,
}: {
  card: PaymentCard;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (card: PaymentCard) => void;
}) {
  const editRef = React.useRef<HTMLButtonElement>(null);
  const country = COUNTRIES.find((c) => c.value === card.country)?.label ?? card.country;
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div>
          <CardTitle>Payment method</CardTitle>
          <CardDescription>Used for your subscription and add-ons</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-gap-11">
        <div className="flex items-center gap-gap-7">
          <span className="flex size-size-16 shrink-0 items-center justify-center rounded-container-sm bg-static-fill-alpha-subtle text-static-text-base [&_svg]:size-size-11">
            <CreditCard aria-hidden />
          </span>
          <div className="flex min-w-0 flex-col gap-gap-2">
            <Typography variant="label-strong-medium" tone="strong">
              {card.brand} ending {card.last4}
            </Typography>
            <Typography variant="caption-medium" tone="subtle">
              Expires {card.expiry}
            </Typography>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-gap-9">
          <div className="flex min-w-0 flex-col gap-gap-3">
            <dt className="type-caption-medium text-static-text-subtle">Cardholder</dt>
            <dd className="m-0 truncate type-label-strong-medium text-static-text-strong">{card.name}</dd>
          </div>
          <div className="flex min-w-0 flex-col gap-gap-3">
            <dt className="type-caption-medium text-static-text-subtle">Billing country</dt>
            <dd className="m-0 truncate type-label-strong-medium text-static-text-strong">{country}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Modal open={open} onOpenChange={onOpenChange}>
          <ModalTrigger asChild>
            <Button ref={editRef} variant="secondary" appearance="border">
              Edit payment method
            </Button>
          </ModalTrigger>
          <ModalContent
            size="medium"
            // Also opened from the failed-payment Alert, whose button unmounts on save: always return focus here.
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              editRef.current?.focus();
            }}
          >
            {/* Remount the form on every open so it starts from the saved card. */}
            {open && <PaymentForm card={card} onSave={onSave} />}
          </ModalContent>
        </Modal>
      </CardFooter>
    </Card>
  );
}

type Errors = Partial<Record<"name" | "number" | "expiry" | "cvc", string>>;

function validate(v: { name: string; number: string; expiry: string; cvc: string }): Errors {
  const errors: Errors = {};
  const digits = v.number.replace(/\s/g, "");
  if (!v.name.trim()) errors.name = "Enter the name shown on the card.";
  if (!/^\d{16}$/.test(digits)) errors.number = "Enter the 16-digit number on the front of the card.";
  const m = /^(\d{2})\/(\d{2})$/.exec(v.expiry.trim());
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) errors.expiry = "Use the format MM/YY, for example 08/28.";
  else if (Number(m[2]) < 26 || (Number(m[2]) === 26 && Number(m[1]) < 11)) errors.expiry = "This card has expired. Use a card that's still valid.";
  if (!/^\d{3,4}$/.test(v.cvc)) errors.cvc = "Enter the 3 or 4 digits on the back of the card.";
  return errors;
}

function PaymentForm({ card, onSave }: { card: PaymentCard; onSave: (card: PaymentCard) => void }) {
  const [values, setValues] = React.useState({ name: card.name, number: "", expiry: "", cvc: "", country: card.country });
  const [errors, setErrors] = React.useState<Errors>({});
  const [saving, setSaving] = React.useState(false);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key as keyof Errors]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first field that needs fixing once the error state renders.
      const form = e.currentTarget as HTMLFormElement;
      requestAnimationFrame(() => form.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setSaving(true);
    window.setTimeout(() => {
      const digits = values.number.replace(/\s/g, "");
      onSave({
        name: values.name.trim(),
        brand: digits.startsWith("5") ? "Mastercard" : "Visa",
        last4: digits.slice(-4),
        expiry: values.expiry.trim(),
        country: values.country,
      });
    }, 700);
  };

  return (
    <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
      <ModalHeader title="Edit payment method" description={`Replaces the ${card.brand} ending ${card.last4} for all future charges.`} />
      <ModalBody className="grid gap-gap-11">
        <Input label="Name on card" autoComplete="cc-name" value={values.name} onChange={set("name")} error={errors.name} />
        <Input
          label="Card number"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 1234 1234 1234"
          value={values.number}
          onChange={set("number")}
          error={errors.number}
          prefix={<CreditCard />}
        />
        <div className="grid grid-cols-2 gap-gap-11">
          <Input label="Expiry date" autoComplete="cc-exp" placeholder="MM/YY" value={values.expiry} onChange={set("expiry")} error={errors.expiry} />
          <Input
            label="Security code"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="CVC"
            value={values.cvc}
            onChange={set("cvc")}
            error={errors.cvc}
            helperText={errors.cvc ? undefined : "3 or 4 digits"}
          />
        </div>
        <Select label="Billing country" value={values.country} onValueChange={(country) => setValues((v) => ({ ...v, country }))}>
          {COUNTRIES.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </Select>
      </ModalBody>
      <ModalFooter>
        <ModalClose asChild>
          <Button type="button" variant="secondary" appearance="border" disabled={saving}>
            Cancel
          </Button>
        </ModalClose>
        <Button type="submit" loading={saving}>
          Save card
        </Button>
      </ModalFooter>
    </form>
  );
}

/* ---------- Invoices ---------- */

function InvoicesCard({ invoices }: { invoices: Invoice[] }) {
  const { show } = useToast();
  const [filter, setFilter] = React.useState<"all" | InvoiceStatus>("all");
  const rows = filter === "all" ? invoices : invoices.filter((i) => i.status === filter);

  return (
    <Card>
      <CardHeader className="flex-wrap">
        <div>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Download a PDF for your records or your finance team.</CardDescription>
        </div>
        <Select
          label="Status"
          size="small"
          value={filter}
          onValueChange={(v) => setFilter(v as typeof filter)}
          wrapperClassName="w-full sm:w-auto sm:min-w-size-28"
        >
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
          <SelectItem value="refunded">Refunded</SelectItem>
        </Select>
      </CardHeader>
      {rows.length === 0 ? (
        <CardContent className="flex flex-col items-center gap-gap-7 py-gap-16 text-center">
          <Typography variant="label-strong-medium" tone="strong">
            No {filter} invoices
          </Typography>
          <Typography variant="body-medium" tone="subtle">
            Try another status to see the rest of your billing history.
          </Typography>
          <Button variant="secondary" appearance="border" size="small" onClick={() => setFilter("all")}>
            Show all invoices
          </Button>
        </CardContent>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead numeric className="hidden sm:table-cell">
                Amount
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-0">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell
                  className="whitespace-nowrap"
                  description={
                    <>
                      {/* The Amount column is hidden below sm, so the amount takes the period's place there. */}
                      <span className="sm:hidden">{usd(inv.amount)}</span>
                      <span className="hidden sm:inline">{inv.period}</span>
                    </>
                  }
                >
                  {inv.id}
                </TableCell>
                <TableCell className="hidden whitespace-nowrap sm:table-cell">{inv.date}</TableCell>
                <TableCell numeric className="hidden sm:table-cell">
                  {usd(inv.amount)}
                </TableCell>
                <TableCell>
                  <Badge status={STATUS[inv.status].badge} size="small">
                    {STATUS[inv.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Tooltip content="Download PDF">
                    <IconButton
                      size="small"
                      icon={<Download />}
                      aria-label={`Download ${inv.id} as PDF`}
                      onClick={() => show({ status: "neutral", title: `Downloading ${inv.id}.pdf` })}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
