using System;
using System.Reflection;
using Autofac;
using CML.DataAccess.RegisterExtension;
using CML.Lib.Dependency;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CML.SqlDoc.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            var repositoryAssembly = Assembly.Load("CML.SqlDoc.Repository");

            var builder = new ContainerBuilder();
            ContainerManager.UseAutofacContainer(builder)
                                          .RegisterAssemblyTypes(repositoryAssembly, m => m.Namespace != null && m.Namespace.StartsWith("CML.SqlDoc.Repository.Implement") && m.Name.EndsWith("Respository"), lifeStyle: LifeStyle.PerLifetimeScope)
                                          .UseDataAccess();
            return ContainerManager.RegisterProvider(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
