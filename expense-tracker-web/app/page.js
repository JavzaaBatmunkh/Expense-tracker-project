"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import { Check, BadgeDollarSign, Bath, Bus, CarFront, ChartCandlestick, Cherry, Drama, FerrisWheel, Fuel, GraduationCap, HandCoins, Hospital, House, IceCreamCone, Laptop, Plane, Shirt, ShoppingCart, SmartphoneNfc, TentTree, TramFront, Utensils, Square } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { RecordDialog } from "@/components/recordDialog";
import CategoryDialog from "@/components/categoryDialog";
const categoryIcons = [
  { name: "transportation", Icon: Bus },
  { name: "ferriswheel", Icon: FerrisWheel },
  { name: "drama", Icon: Drama },
  { name: "phone", Icon: SmartphoneNfc },
  { name: "chart", Icon: ChartCandlestick },
  { name: "restaurant", Icon: Utensils },
  { name: "cherry", Icon: Cherry },
  { name: "ice-cream", Icon: IceCreamCone },
  { name: "car", Icon: CarFront },
  { name: "shopping", Icon: ShoppingCart },
  { name: "shirt", Icon: Shirt },
  { name: "dollar", Icon: BadgeDollarSign },
  { name: "fuel", Icon: Fuel },
  { name: "plane", Icon: Plane },
  { name: "train", Icon: TramFront },
  { name: "bathroom", Icon: Bath },
  { name: "coins", Icon: HandCoins },
  { name: "tent", Icon: TentTree },
  { name: "graduation", Icon: GraduationCap },
  { name: "laptop", Icon: Laptop },
  { name: "hospital", Icon: Hospital },
  { name: "home", Icon: House }
]
const categoryColors = [{ name: "blue", value: "#0166FF" }, { name: "light-blue", value: "#01B3FF" },
{ name: "green", value: "#41CC00" }, { name: "yellow", value: "#F9D100" }, { name: "orange", value: "#FF7B01" }, { name: "purple", value: "#AE01FF" }, { name: "red", value: "#FF0101" },]

export default function Home() {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState("home")
  const [color, setColor] = useState("blue")
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [editingCategory, setEditingCategory] = useState()

  const [amount, setAmount] = useState()
  const [categoryId, setCategoryId] = useState()
  const [type, setType] = useState()
  const [date, setDate] = useState()
  const [payee, setPayee] = useState()
  const [note, setNote] = useState()
  const [editingTransaction, setEditingTransaction] = useState()


  const [transactions, setTransactions] = useState([])

  function loadList() {
    fetch("http://localhost:4000/categories")
      .then(res => res.json())
      .then((data) => { setCategories(data) })
  }

  function loadTransactions() {
    fetch("http://localhost:4000/transaction")
      .then(res => res.json())
      .then((data) => { setTransactions(data) })
  }

  function reset() {
    setColor("blue");
    setIcon("home");
    setNewCategory("")
    setEditingCategory(null)
  }

  useEffect(() => {
    loadList()
    loadTransactions()
  }, [])

  function createNew() {
    setLoading(true)
    fetch(`http://localhost:4000/categories`,
      {
        method: "POST",
        body: JSON.stringify({
          name: newCategory,
          color: color,
          icon: icon
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      .then(() => {
        loadList();
        setLoading(false)
        setOpen(false);
        toast("Category has been created successfully.")
        reset()
      })
  }

  function createNewTransaction() {
    setLoading(true)
    fetch(`http://localhost:4000/transaction`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: amount,
          categoryId: categoryId,
          type: type,
          date: date,
          payee: payee,
          note: note
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      .then(() => {
        loadTransactions();
        setLoading(false)
        toast("Category has been created successfully.")
        reset()
      })
  }

  function deleteCategory(id) {
    const confirmation = confirm("Are you sure to delete?")
    if (confirmation === true) {
      fetch(`http://localhost:4000/categories/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(() => { loadList() })
    }
    else { }
  }

  function updateCategory() {
    setLoading(true)

    fetch(`http://localhost:4000/categories/${editingCategory.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ newName: newCategory, color: color, icon: icon }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
    )
      .then(() => {
        loadList();
        setLoading(false);
        setOpen(false);
        toast("Successfully updated.");
        reset()
      })
  }

  function updateTransaction() {
    setLoading(true)

    fetch(`http://localhost:4000/categories/${editingTransaction.id}`,
      {
        method: "PUT",
        body: JSON.stringify({           
          amount: amount,
          categoryId: categoryId,
          type: type,
          date: date,
          payee: payee,
          note: note }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
    )
      .then(() => {
        loadTransactions();
        setLoading(false);
        toast("Successfully updated.");
        reset()
      })
  }

  function deleteTransaction(id) {
    const confirmation = confirm("Are you sure to delete?")
    if (confirmation === true) {
      fetch(`http://localhost:4000/categories/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(() => { loadTransactions() })
    }
    else { }
  }

  // const date = new Date()
  useEffect(() => {
    if (editingCategory) {
      setOpen(true);
      setNewCategory(editingCategory.name);
      setIcon(editingCategory.icon);
      setColor(editingCategory.color)
    }
  }, [editingCategory])


  return (
    <main className="flex gap-10">
      <Header/>
      <Sidebar/>
      <RecordDialog/>
      <Toaster />
      <div>
        {/* add record button */}
        {/* <Dialog>
          <DialogTrigger>+Add New Record</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Record</DialogTitle>
              <hr />
              <DialogDescription className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <RadioGroup value={type}  onValueChange={(val) => setType(val)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expense" id="option-one" />
                      <Label htmlFor="option-one">Expense</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="income" id="option-two" />
                      <Label htmlFor="option-two">Income</Label>
                    </div>
                  </RadioGroup>
                  <div>
                    <p className="text-left">Amount</p>
                    <Input className="" placeholder="$000.00" disabled={loading} value={amount}
                        onChange={(event) => { setAmount(event.target.value) }}/>
                  </div>
                  <div>
                    Category
                    <Select onValueChange={(val) => setCategoryId(val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Find or choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem value={category.id} key={category.id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <p>Date</p>
                      <Input className="" placeholder="000.00" type="text" disabled={loading} value={date}
                        onChange={(event) => { setDate(event.target.value) }} />
                    </div>
                    <div>
                      <p>Time</p>
                      <Input className="" placeholder="000.00" />
                    </div>
                  </div>
                  <Button className="w-full rounded-full" onClick={createNewTransaction} >Add record</Button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label >Payee</Label>
                    <Input placeholder="Write here" type="text" disabled={loading} value={payee}
                      onChange={(event) => { setPayee(event.target.value) }} />
                  </div>
                  <div className=" w-full max-w-sm items-center gap-1.5 h-[100%]">
                    <Label>Note</Label>
                    <Textarea placeholder="Write here" className="h-[100%]" type="text" disabled={loading} value={note}
                      onChange={(event) => { setNote(event.target.value) }} />
                  </div>
                </div>

              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
        {/* categories printed displayed */}
        {/* , updateCategory(category.id, category.name) */}
        {categories.map((category) => (
          <div key={category.id} className="flex gap-2">
            <CategoryIcon iconName={category.icon} color={category.color} />
            {category.name}
            <Button onClick={() => setEditingCategory(category)}>edit</Button>
            <Button onClick={() => deleteCategory(category.id)}>delete</Button>
          </div>
        ))}
        {/* add new category button */}
        <Button onClick={() => { reset(); setOpen(true) }} variant="outline" >+ Add New Category</Button>
        {/* <Dialog open={open}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <hr />
              <DialogDescription className="flex gap-4">
                <Popover>
                  <PopoverTrigger><CategoryIcon iconName={icon} color={color} /></PopoverTrigger>
                  <PopoverContent >
                    <div className="grid grid-cols-4 gap-2">
                      {categoryIcons.map(({ name, Icon }) =>
                        <div className={`relative w-8 h-8 flex justify-center items-center rounded-lg
                      ${icon === name ? "bg-blue-300 border-blue-950" : ""}`} value={name} key={name}
                          onClick={() => setIcon(name)}>
                          {<Icon />}
                        </div>)}
                    </div>
                    <hr className="my-4" />
                    <div className="flex gap-1">
                      {categoryColors.map(({ name, value }) =>
                        <div key={name} className="rounded-full h-8 w-8 flex justify-center items-center" style={{ background: value }}
                          onClick={() => setColor(name)}>
                          {color === name && <Check className="text-white w-4" />}
                        </div>)}
                    </div>
                  </PopoverContent>
                </Popover>
                <Input placeholder="Name" type="text" value={newCategory} disabled={loading}
                  onChange={(event) => { setNewCategory(event.target.value) }} />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {editingCategory ? (
                <Button onClick={updateCategory} className="bg-green-700 hover:bg-green-900" disabled={loading}>Update</Button>
              ) : (
                <Button onClick={createNew} className="bg-green-700 hover:bg-green-900" disabled={loading}>Add</Button>
              )}

              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
        <CategoryDialog open={open} onClose={()=>setOpen(false)}/>
      </div>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex gap-2">
            <div className="w-10 h-10 rounded-full flex justify-center items-center" style={{ background: transaction.color }}>
              <CategoryIcon iconName={transaction.icon} className="text-white" />
            </div>
            {transaction.name}
            {transaction.amount}
            <Button >edit</Button>
            <Button >delete</Button>
          </div>
        ))}

      </div>
    </main>
  );
}
function CategoryIcon({ iconName, color }) {
  const iconObject = categoryIcons.find((item) => item.name === iconName)
  const colorObject = categoryColors.find((item) => item.name === color)
  if (!iconObject) { return <House /> }

  let hexcolor;
  if (!colorObject) { hexcolor = "#000" }
  else { hexcolor = colorObject.value }
  const { Icon } = iconObject
  return <Icon style={{ color: hexcolor }} />
}
