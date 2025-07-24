// Forzar redeploy: migración a Resend
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_F469PnJy_qfcVzdBfXP9ALkGa1MKP2wWv");

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { tipoProyecto, extras, descripcion, nombre, email, presupuesto } = data;
        if (!tipoProyecto || !nombre || !email || !presupuesto) {
            return NextResponse.json({ ok: false, mensaje: "Faltan datos obligatorios." }, { status: 400 });
        }

        // Email para ti
        const mailOptions = {
            from: "onboarding@resend.dev",
            to: process.env.EMAIL_TO || "pablopadev@gmail.com",
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
            text: `Solicitud de presupuesto\nNombre: ${nombre}\nEmail: ${email}\nTipo de proyecto: ${tipoProyecto}\nExtras: ${extras && extras.length ? extras.join(", ") : "Ninguno"}\nDescripción: ${descripcion || "(Sin descripción)"}\nPresupuesto estimado: ${presupuesto}€`
        };

        await resend.emails.send(mailOptions);

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
        await resend.emails.send({
            from: "onboarding@resend.dev",
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
          `,
            text: `¡Hola ${nombre}!\nHe recibido tu solicitud de presupuesto para ${servicio} y me pondré a trabajar en ella de inmediato.\nPara comenzar el desarrollo, solo tienes que realizar un Bizum del 10% del presupuesto (${anticipo} €) al número +34 657 285 571.\nCuando reciba el anticipo, te avisaré y comenzamos con tu proyecto. El resto se abona al finalizar el trabajo.\nTe mantendré informado/a de cada paso y en un plazo máximo de 15 días tendrás tu pedido listo.\nPresupuesto estimado: ${presupuesto}€\nSi tienes cualquier duda, puedes responder a este correo o escribirme por WhatsApp.\n¡Gracias por confiar en mi trabajo!`
        });

        return NextResponse.json({ ok: true, mensaje: "¡Solicitud recibida! Te responderé lo antes posible." });
    } catch (error) {
        console.error("Error enviando email:", error);
        return NextResponse.json({ ok: false, mensaje: "Error enviando el email. Intenta de nuevo o contacta por WhatsApp." }, { status: 500 });
    }
} 