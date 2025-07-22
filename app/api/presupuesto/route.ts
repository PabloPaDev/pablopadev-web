import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { tipoProyecto, extras, descripcion, nombre, email, presupuesto } = data;
        if (!tipoProyecto || !nombre || !email || !presupuesto) {
            return NextResponse.json({ ok: false, mensaje: "Faltan datos obligatorios." }, { status: 400 });
        }

        // Configurar el transporter de Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email para ti
        const mailOptions = {
            from: `PabloPaDev <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `Nueva solicitud de presupuesto de ${nombre}`,
            html: `
        <h2>Solicitud de presupuesto</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Tipo de proyecto:</b> ${tipoProyecto}</p>
        <p><b>Extras:</b> ${extras && extras.length ? extras.join(", ") : "Ninguno"}</p>
        <p><b>Descripción:</b> ${descripcion || "(Sin descripción)"}</p>
        <p><b>Presupuesto estimado:</b> <span style="color:#2563eb;font-weight:bold;">${presupuesto}€</span></p>
      `,
        };

        await transporter.sendMail(mailOptions);

        // Email de confirmación al cliente personalizado
        let servicio = "tu proyecto";
        if (typeof tipoProyecto === "string") {
            if (["landing", "apis", "backend"].includes(tipoProyecto)) {
                servicio = "desarrollo web";
            } else if (["pequena", "grande"].includes(tipoProyecto)) {
                servicio = "base de datos";
            } else if (["basico", "intermedio", "avanzado"].includes(tipoProyecto)) {
                servicio = "gestión de redes sociales";
            }
        }
        const anticipo = Math.round((presupuesto * 0.1) * 100) / 100;
        await transporter.sendMail({
            from: `PabloPaDev <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `¡Hemos recibido tu solicitud de presupuesto para ${servicio}!`,
            html: `
            <p>¡Hola ${nombre}!</p>
            <p>He recibido tu solicitud de presupuesto para <b>${servicio}</b> y me pondré a trabajar en ella de inmediato.</p>
            <p>Para comenzar el desarrollo, solo tienes que realizar un <b>Bizum del 10% del presupuesto</b> (<b>${anticipo} €</b>) al número <b>+34 657 285 571</b>.</p>
            <p>Cuando reciba el anticipo, te avisaré y comenzamos con tu proyecto. El resto se abona al finalizar el trabajo.</p>
            <p>Te mantendré informado/a de cada paso y en un plazo máximo de <b>15 días</b> tendrás tu pedido listo.</p>
            <p><b>Presupuesto estimado:</b> ${presupuesto}€</p>
            <p>Si tienes cualquier duda, puedes responder a este correo o escribirme por WhatsApp.</p>
            <p>¡Gracias por confiar en mi trabajo!</p>
          `
        });

        return NextResponse.json({ ok: true, mensaje: "¡Solicitud recibida! Te responderé lo antes posible." });
    } catch (error) {
        return NextResponse.json({ ok: false, mensaje: "Error enviando el email. Intenta de nuevo o contacta por WhatsApp." }, { status: 500 });
    }
} 